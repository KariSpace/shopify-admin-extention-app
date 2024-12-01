import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";
import AdminApi from "../adminApi"

export const loader = async ({request, params }) => {
    const { admin, session } = await authenticate.admin(request);
    console.log(admin, session)

    let id = params.id
    console.log("POST: /api/order/" + id + "/issues")
    let api = AdminApi({
        sessionToken:  session.accessToken
    })
    console.log("fetching")
    
    try {
        let orderData = await api.getIssue(id)
        console.log(orderData)
        return json(orderData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        });
    } catch (error) {
        console.error("Error fetching order:", error);
        return json(
            { error: error.message || "An error occurred while fetching the order", status:  "error"}
        );
    }
};