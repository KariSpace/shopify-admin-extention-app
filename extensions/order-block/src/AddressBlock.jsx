
import { Text, Button, InlineStack, BlockStack, Paragraph, Box, Section } from '@shopify/ui-extensions-react/admin';
import React, { useState } from 'react';
import statusBadges from '../../../app/assets/statusBadges.json'


export default function AddressBlock({ addressData }) {
    const addressStructure = ["first_name", "last_name", "street", "house_number", "zip_code", "city", "company", "country", "additional_address"];
    const [isLoading, setIsLoading] = useState(true);
    let filteredAddress = filterAddress(addressData, addressStructure);
    console.log(filteredAddress)
    function filterAddress(address, addressStructure) {
        const filteredAddress = {};
        addressStructure.forEach(property => {
            if (address.hasOwnProperty(property)) {
                filteredAddress[property] = address[property];
            }
        });
        console.log(filteredAddress)
        return filteredAddress;
    }


    return (
        <>
            <BlockStack padding="base">
                {addressStructure.map(key => (
                    <InlineStack key={key} blockAlignment="start">
                        <BlockStack >
                            <Text fontWeight='bold'>{key}:</Text>
                        </BlockStack>
                        <BlockStack >
                            <Text>{filteredAddress[key]}</Text>
                        </BlockStack>
                    </InlineStack>
                ))}
            </BlockStack>
        </>
    )
}