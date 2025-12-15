const Coupon = require('../models/Coupon');
const axios = require('axios');

async function approveDeviceOnOC200(clientMac, apMac, coupon) {
  // Using OC200 approve URL (example)
  const approveUrl = `${process.env.OC200_BASE}/portal/auth?clientMac=${clientMac}&apMac=${apMac}&voucher=${coupon.code}`;
  // If OC200 requires basic auth:
  const auth = {
    username: process.env.OC200_USER,
    password: process.env.OC200_PASS
  };
  // many OC200 controllers use HTTP GET with query params
  const res = await axios.get(approveUrl, { auth, timeout:5000 });
  return res.data;
}

module.exports.login = async (req,res)=>{
  try{
    // expected JSON: { clientMac, apMac, ssid, voucher }
    const {clientMac, apMac, ssid, voucher} = req.body;
    const c = await Coupon.findOne({code:voucher});
    if(!c) return res.status(404).json({message:'Invalid voucher'});
    if(c.isExpired) return res.status(400).json({message:'Expired'});
    // device limit
    const used = c.devicesUsed ? c.devicesUsed.length : 0;
    if(c.deviceLimit && used >= c.deviceLimit) return res.status(403).json({message:'device limit reached'});
    // add device
    c.devicesUsed = c.devicesUsed || [];
    const found = c.devicesUsed.find(d=>d.mac === clientMac);
    if(!found){
      c.devicesUsed.push({mac:clientMac, addedAt:new Date()});
    }
    if(!c.startTime) c.startTime = new Date();
    if(!c.expiresAt){
      const plan = await require('../models/Plan').findById(c.plan);
      c.expiresAt = new Date(Date.now() + plan.durationMinutes*60000);
    }
    await c.save();
    // call OC200 to approve
    const approveResp = await approveDeviceOnOC200(clientMac, apMac, c);
    // return success payload expected by captive portal
    res.json({message:'Login successful', allow:true, expiresAt: c.expiresAt.getTime()});
  }catch(e){
    console.error(e);
    res.status(500).json({error:e.message});
  }
};