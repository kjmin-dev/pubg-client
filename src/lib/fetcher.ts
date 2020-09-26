import fetch from 'node-fetch'
import { RequestInit } from 'node-fetch'

class fetcher {
    private _prefix: string
    private _key: string
    private _default_opts: RequestInit
    
    constructor(newPrefix = "https://api.pubg.com") {
        this.prefix = newPrefix
        this._default_opts = {}
    }
    
    get prefix():string {
        return this._prefix
    }

    set prefix(newPrefix: string) {
        this._prefix = newPrefix
    }

    get key():string {
        return this._key
    }

    set key(newKey: string) {
        this._key = newKey
        this._default_opts = {
            ...this._default_opts,
            headers: {
                Authorization: `Bearer ${newKey}`,
                Accept: "application/vnd.api+json"
            }
        }
    }
    
    get default_opts():RequestInit {
        return this._default_opts
    }

    checkKey(): boolean {
        return this._key !== undefined
    }

    async get(url: string, opts?: RequestInit): Promise<any> {
        return (await fetch(this._prefix + url, { ...opts, ...this._default_opts })).json()
    }
    
    async post(url: string , opts?: RequestInit): Promise<any> {
        return (await fetch(this._prefix + url, { ...opts, ...this._default_opts })).json()
    }
    
    async put(url: string , opts?: RequestInit): Promise<any> {
        return (await fetch(this._prefix + url, { ...opts, ...this._default_opts })).json()
    }
    
    async del(url: string , opts?: RequestInit): Promise<any> {
        return (await fetch(this._prefix + url, { ...opts, ...this._default_opts })).json()
    }
}

export default fetcher