import React from 'react';
import { Box, InlineStack, Heading, Text, Badge, BlockStack, Divider } from '@shopify/ui-extensions-react/admin';

function Issue({ issue }) {
  const statusTones = {
    "init": "info",
    "waiting for response": "info",
    "closed": "success",
    "pending": "warning"
  };
  return (
    <Box paddingBlockEnd="large">
    <Box padding="large" paddingBlockEnd="large">
      <InlineStack  inlineAlignment="space-between">
        <BlockStack  paddingBlockStart="small">
          <Heading size="4" >{issue.issue_description} : {issue.issue_type}</Heading>
          {issue.items.map((item, index) => (
            <Text key={index}>∙ {item.target_type}: {item.target_uid}</Text>
          ))}
        </BlockStack>
        <Badge tone={statusTones[issue.issue_status.toLowerCase()] || "default"}>{issue.issue_status.toLowerCase()}</Badge>
      </InlineStack>
      <Divider />
      <BlockStack paddingBlockStart="small">
        {/* <InlineStack gap="tight"> */}

        {Object.entries(issue.history)
          .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
          .map(([date, info], index) => (
          <React.Fragment key={index}>
            <Text>{date}: {info.message} {info.data.status ? `| ${info.data.status}` : ''} {info.data.entity ? `| ${info.data.entity}${info.data.type ? ` : ${info.data.type}` : ''}` : ''}</Text>
          </React.Fragment>
        ))}
        {/* </InlineStack> */}
      </BlockStack>
    </Box>
    </Box>
  );
}

export default Issue;
