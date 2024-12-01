import fetch from 'node-fetch';
import { env } from 'node:process';
const BASE_URL = "http://127.0.0.1:5000" 
const API_KEY = "TestTestTest" 


export default function AdminApi(initObj) {
    const base_uri = env.API_BASE_URL ?? BASE_URL
    const apiKey = env.API_KEY ?? API_KEY
    const shopIdentifier = env.SHOP_IDENTIFIER
    const _runRequest = async (endpoint, _sessionToken, payload = {}, method="POST") => {
        let res = await fetch(
            base_uri + endpoint,
            {       
                headers: {
                    "X-Admin-Authentication": apiKey,
                    "X-Shopify-Shop-Domain": shopIdentifier,
                    "Content-Type": "application/json"
                },
                method: method,
                body: JSON.stringify(payload)
            }
        ).then ( data => {
            return data
        }).catch( err => {
            console.log({
                "status": "error",
                "method": "_runRequest",
                "data": {
                    payload: payload,
                    endpoint:endpoint,
                    error: err
                }
            })
            return null
        })
        console.log(res)
        let r = res.json()
        console.log(r)
        return r
    }
    return {
        _sessionToken: initObj.sessionToken ?? null,
        setSessionToken: function (token) {
            this._sessionToken = token
        },
        getOrder: async function (shopifyOrderId) {
            return await _runRequest(
                "/shopify/admin/order/",
                this._sessionToken,
                {
                    "shopify_order_id": shopifyOrderId
                },
                "POST"
            )
        },
        getIssue: async function (shopifyOrderId) {
            return await _runRequest(
                "/rest/order/issues",
                this._sessionToken,
                {
                    "shopify_order_id": shopifyOrderId
                },
                "POST"
            );
        }
    }
}
