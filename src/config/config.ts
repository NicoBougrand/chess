import dotenv from "dotenv";
import path from "path";

export default class Config {

    public static get(): Config {
        if (!this.instance) {
            this.instance = new Config();
        }
        return this.instance;
    }
    private static instance: Config;

    private env: string;
    private host: string;
    private port: string;
    private appName: string;
    private routePrefix: string;
    private distName: string;
    private certsName: string;
    private srcName: string;
    private publicDir: string;
    private publicPrefix: string;
    private secretKey: string;
    private authSecured: string;

    private constructor() {
        dotenv.config();
        this.env = process.env.NODE_ENV;
        this.host = process.env.APP_HOST || "localhost";
        this.port = process.env.APP_PORT || "3000";
        this.appName = process.env.APP_NAME;
        this.routePrefix = process.env.ROUTE_PREFIX;
        this.distName = path.join(__dirname, "..");
        this.certsName = path.join(this.distName, "../certs");
        this.srcName = path.join(this.distName, "../src");
        this.publicDir = path.join(this.srcName, "public");
        this.publicPrefix = `${this.routePrefix}/public`;
        this.authSecured = process.env.AUTH_SECURED || "true";
        this.secretKey = process.env.SECRET_KEY;
    }

    public getEnv(): string {
        return this.env;
    }

    public getHost(): string {
        return this.host;
    }

    public getPort(): string {
        return this.port;
    }

    public getAppName(): string {
        return this.appName;
    }

    public getRoutePrefix(): string {
        return this.routePrefix;
    }

    public getCertsName(): string {
        return this.certsName;
    }

    public getSrcName(): string {
        return this.srcName;
    }

    public getPublicDir(): string {
        return this.publicDir;
    }

    public getPublicPrefix(): string {
        return this.publicPrefix;
    }

    public getSecretKey(): string {
        return this.secretKey;
    }

    public isAuthSecured(): boolean {
        return this.authSecured === "true";
    }

}
