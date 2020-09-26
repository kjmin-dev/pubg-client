import fetch from 'node-fetch'
import { RequestInit } from 'node-fetch'

class _fetcher {
    private _prefix: string
    private _key: string
    private _default_opts: RequestInit

    constructor(newKey: string) {
        this._key = newKey
        this._prefix = 'https://api.pubg.com'
        this._default_opts = {
            headers: {
                Authorization: `Bearer ${newKey}`,
                Accept: 'application/vnd.api+json',
                'Accept-Encoding': '',
            },
        }
    }

    get gzip(): boolean {
        return this._default_opts.headers['Accept-Encoding'] === 'gzip'
    }

    set gzip(use: boolean) {
        this._default_opts.headers['Accept-Encoding'] = use ? 'gzip' : ''
    }

    get prefix(): string {
        return this._prefix
    }

    set prefix(newPrefix: string) {
        this._prefix = newPrefix
    }

    get key(): string {
        return this._key
    }

    set key(newKey: string) {
        this._key = newKey
        this._default_opts = {
            ...this._default_opts,
            headers: {
                Authorization: `Bearer ${newKey}`,
                Accept: 'application/vnd.api+json',
            },
        }
    }

    get default_opts(): RequestInit {
        return this._default_opts
    }

    checkKey(): boolean {
        return this._key !== undefined
    }

    async get(url: string, opts?: RequestInit): Promise<any> {
        return (
            await fetch(this._prefix + url, { ...opts, ...this._default_opts })
        ).json()
    }
}

export default _fetcher
