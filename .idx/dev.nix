'{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # Or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.flutter
    pkgs.dart
    pkgs.mongodb
  ];
  # Sets environment variables in the workspace
  env = {};
  # Fast way to run commands such as `npm install` on startup.
  startup = {
    # Add commands that should be run in sequence
    # commands = [
    #   {
    #     command = "npm install"; # This is an example. Replace with your own.
    #     # silently = false; # This is the default. Set to true to hide command output.
    #     #
    #     # Read more about command objects:
    #     # https://developers.google.com/idx/guides/customize-idx-env#command-objects
    #   }
    # ];
  };
  # Pinned Nixpkgs version, required for IDX check
  nixpkgs = {
    url = "https://github.com/NixOS/nixpkgs/archive/refs/tags/23.11.zip";
    sha256 = "1e9124d7168053243c3333333333333333333333333333333333333333333333"; # Replace with the correct sha256
  };
}