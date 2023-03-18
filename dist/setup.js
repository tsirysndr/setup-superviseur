import { getExecOutput } from "@actions/exec";
export default async (options) => {
    // download and install the latest version of the supervisor from github releases
    // macos arm: https://github.com/tsirysndr/superviseur/releases/download/v0.1.0-alpha.3/superviseur_v0.1.0-alpha.3_aarch64-apple-darwin.tar.gz
    // macos intel: https://github.com/tsirysndr/superviseur/releases/download/v0.1.0-alpha.3/superviseur_v0.1.0-alpha.3_x86_64-apple-darwin.tar.gz
    // linux: https://github.com/tsirysndr/superviseur/releases/download/v0.1.0-alpha.3/superviseur_v0.1.0-alpha.3_x86_64-unknown-linux-gnu.tar.gz
    const release = encodeURIComponent(options?.version ?? "latest");
    const os = encodeURIComponent(options?.os ?? process.platform);
    const arch = encodeURIComponent(options?.arch ?? process.arch);
    let version;
    let cacheHit = false;
    return {
        version,
        cacheHit,
    };
};
async function verifySuperviseur(path) {
    const { exitCode, stdout } = await getExecOutput(path, ["--version"], {
        ignoreReturnCode: true,
    });
    return exitCode === 0 ? stdout.trim() : undefined;
}
