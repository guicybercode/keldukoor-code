{
  lib,
  stdenvNoCC,
  callPackage,
  bun,
  sysctl,
  makeBinaryWrapper,
  models-dev,
  ripgrep,
  installShellFiles,
  versionCheckHook,
  writableTmpDirAsHomeHook,
  node_modules ? callPackage ./node-modules.nix { },
}:
stdenvNoCC.mkDerivation (finalAttrs: {
  pname = "localcode";
  inherit (node_modules) version src;
  inherit node_modules;

  nativeBuildInputs = [
    bun
    installShellFiles
    makeBinaryWrapper
    models-dev
    writableTmpDirAsHomeHook
  ];

  configurePhase = ''
    runHook preConfigure

    cp -R ${finalAttrs.node_modules}/. .

    runHook postConfigure
  '';

  env.MODELS_DEV_API_JSON = "${models-dev}/dist/_api.json";
  env.LOCALCODE_DISABLE_MODELS_FETCH = true;
  env.LOCALCODE_VERSION = finalAttrs.version;
  env.LOCALCODE_CHANNEL = "local";

  buildPhase = ''
    runHook preBuild

    cd ./packages/localcode
    bun --bun ./script/build.ts --single --skip-install
    bun --bun ./script/schema.ts schema.json

    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall

    install -Dm755 dist/localcode-*/bin/localcode $out/bin/localcode
    install -Dm644 schema.json $out/share/localcode/schema.json

    wrapProgram $out/bin/localcode \
      --prefix PATH : ${
        lib.makeBinPath (
          [
            ripgrep
          ]
          # bun runs sysctl to detect if dunning on rosetta2
          ++ lib.optional stdenvNoCC.hostPlatform.isDarwin sysctl
        )
      }

    runHook postInstall
  '';

  postInstall = lib.optionalString (stdenvNoCC.buildPlatform.canExecute stdenvNoCC.hostPlatform) ''
    # trick yargs into also generating zsh completions
    installShellCompletion --cmd localcode \
      --bash <($out/bin/localcode completion) \
      --zsh <(SHELL=/bin/zsh $out/bin/localcode completion)
  '';

  nativeInstallCheckInputs = [
    versionCheckHook
    writableTmpDirAsHomeHook
  ];
  doInstallCheck = true;
  versionCheckKeepEnvironment = [ "HOME" "LOCALCODE_DISABLE_MODELS_FETCH" ];
  versionCheckProgramArg = "--version";

  passthru = {
    jsonschema = "${placeholder "out"}/share/localcode/schema.json";
  };

  meta = {
    description = "The open source coding agent";
    homepage = "https://localcode.dev/";
    license = lib.licenses.mit;
    mainProgram = "localcode";
    inherit (node_modules.meta) platforms;
  };
})
