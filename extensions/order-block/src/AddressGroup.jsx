
import { Text, Button, InlineStack, BlockStack, Heading,ProgressIndicator,  Paragraph, Box, Section } from '@shopify/ui-extensions-react/admin';
import React, { useState } from 'react';
import AddressBlock from './AddressBlock.jsx';
import statusBadges from '../../../app/assets/statusBadges.json'


export default function AddressGroup({ order, orderId }) {
    const [isLoading, setIsLoading] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState(order?.deliveryAddress);
    const [invoiceAddress, setInvoiceAddress] = useState(order?.invoiceAddress);



    let handleClick = async function () {
        setIsLoading(true);
        const response = await fetch(`/api/order/${orderId}/sync`);
        const orderData = await response.json();
        console.log(orderData);
        if (orderData.status === 'error') {
            setError(orderData.message);
        } else {
            setDeliveryAddress(orderData.deliveryAddress);
            setInvoiceAddress(orderData.invoiceAddress);
        }
        setIsLoading(false);
    }


    return (
        <>
            <InlineStack gap>
                <Box padding="base">
                    <Heading size="4">Delivery address</Heading>
                    <AddressBlock addressData={deliveryAddress} ></AddressBlock>
                </Box>
                <Box padding="base">
                    <Heading size="4">Invoice address</Heading>
                    <AddressBlock addressData={invoiceAddress} ></AddressBlock>
                </Box>
            </InlineStack>
                <Button isLoading={isLoading} fullWidth onClick={handleClick}>
                    {isLoading ? "Fetching the data..." : "Sync"}

                </Button>
        </>
    )
}