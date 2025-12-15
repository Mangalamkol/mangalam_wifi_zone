import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'dart:io';
import 'package:pdf_text/pdf_text.dart';
import 'dart:convert';
import 'package:flutter/services.dart';

class CodeData {
  final String code;
  final String plan;
  final int price;
  final bool used;
  final String? assignedTo;
  final String? deviceId;

  CodeData({
    required this.code,
    required this.plan,
    required this.price,
    required this.used,
    this.assignedTo,
    this.deviceId,
  });

  factory CodeData.fromJson(Map<String, dynamic> json) {
    return CodeData(
      code: json['code'],
      plan: json['plan'],
      price: json['price'],
      used: json['used'],
      assignedTo: json['assignedTo'],
      deviceId: json['deviceId'],
    );
  }
}

class PdfUploadScreen extends StatefulWidget {
  const PdfUploadScreen({super.key});

  @override
  State<PdfUploadScreen> createState() => _PdfUploadScreenState();
}

class _PdfUploadScreenState extends State<PdfUploadScreen> {
  List<CodeData> _extractedCodes = [];

  Future<void> _pickAndParsePdf() async {
    final result = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: ['pdf'],
    );

    if (result != null) {
      final file = File(result.files.single.path!);
      final text = await PDFDoc.fromPath(file.path).then((doc) => doc.text);

      final regex = RegExp(r'\{.*?\}', dotAll: true);
      final matches = regex.allMatches(text);

      final codes = <CodeData>[];
      for (final match in matches) {
        try {
          final json = jsonDecode(match.group(0)!);
          codes.add(CodeData.fromJson(json));
        } catch (e) {
          // Ignore if the match is not a valid JSON
        }
      }

      setState(() {
        _extractedCodes = codes;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Upload and Parse PDF'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: _pickAndParsePdf,
                child: const Text('Pick and Parse PDF'),
              ),
              const SizedBox(height: 24),
              if (_extractedCodes.isNotEmpty)
                Expanded(
                  child: ListView.builder(
                    itemCount: _extractedCodes.length,
                    itemBuilder: (context, index) {
                      final code = _extractedCodes[index];
                      return Card(
                        margin: const EdgeInsets.symmetric(vertical: 8.0),
                        child: ListTile(
                          title: Text('Code: ${code.code}'),
                          subtitle: Text('Plan: ${code.plan}, Price: ${code.price}'),
                          trailing: IconButton(
                            icon: const Icon(Icons.copy),
                            onPressed: () {
                              Clipboard.setData(ClipboardData(text: code.code));
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text('Code copied to clipboard')),
                              );
                            },
                          ),
                        ),
                      );
                    },
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
