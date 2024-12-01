import React from 'react';
import { Box, InlineStack, Text, Badge, BlockStack } from '@shopify/ui-extensions-react/admin';

function Issue({ issue }) {
  return (
    <Box padding="large">
      <InlineStack inlineAlignment="space-between">
        <Text fontWeight="bold">Order uid: {issue.order.uid}</Text>
        <Badge tone="info">{issue.issue_status}</Badge>
      </InlineStack>
      <BlockStack>
        <Text>{issue.issue_type}</Text>
        <Text>{issue.issue_description}</Text>
        <InlineStack gap="tight">
          {Object.entries(issue.history).map(([date, info], index) => (
            <InlineStack key={index} spacing="tight">
              <Text fontWeight="bold">{date}:</Text>
              <Text>{info.entity}</Text>
              <Text>Updated By: {info.last_updated_by}</Text>
              <Text>Status: {info.status}</Text>
              <Text>Type: {info.type}</Text>
              <Text>Message: {info.message}</Text>
            <Text>Title: {info.data.data.title}</Text>
            </InlineStack>
          ))}
        </InlineStack>
      </BlockStack>
    </Box>
  );
}

export default Issue;
