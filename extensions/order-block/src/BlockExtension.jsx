import {
  AdminBlock,
  Box,
  Badge,
  Button,
  Divider,
  Form,
  Icon,
  InlineStack,
  ProgressIndicator,
  BlockStack,
  HeadingGroup,
  Select,
  Heading,
  Text,
  reactExtension,
  useApi,
} from '@shopify/ui-extensions-react/admin';
import { useState, useEffect } from 'react';
import AddressGroup from './AddressGroup.jsx';
import statusBadges from '../../../app/assets/statusBadges.json'
// The target used here must match the target used in the extension's toml file (./shopify.extension.toml)
const TARGET = 'admin.order-details.block.render';

export default reactExtension(TARGET, () => <App />);

function App() {
  // The useApi hook provides access to several useful APIs like i18n and data.
  const { i18n, data } = useApi(TARGET);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    (async function fetchOrder() {
      setLoading(true);
      setError(null);
      const order_id = data?.selected[0]?.id.replace('gid://shopify/Order/', '');
      setOrderId(order_id);
      const response = await fetch(`/api/order/${order_id}`);
      const orderData = await response.json();
      console.log(orderData);
      if (orderData.status === 'error') {
        setError(orderData.message);
      } else {
        setOrder(orderData);
      }
      setLoading(false);
    })();
  }, [data?.selected[0]]);

  if (loading) {
    return (
      <InlineStack blockAlignment='center' inlineAlignment='center'>
        <ProgressIndicator size="large-100" />
      </InlineStack>
    );
  }

  if (error) {
    return (
      <AdminBlock title="Order">
        <Text tone="critical">{error}</Text>
      </AdminBlock>
    );
  }
console.log(statusBadges)
  return (
    // The AdminBlock component provides an API for setting the title of the Block extension wrapper.
    <AdminBlock title="Order">
      <BlockStack>
        <InlineStack>
          <Box minInlineSize={400}>
            <Text fontWeight="bold">UID: {order.uid}</Text>
          </Box>
          <BlockStack inlineAlignment="end">
            <Badge tone={statusBadges[order.status]} >
              {order.status}
            </Badge>
          </BlockStack>
        </InlineStack>
        <AddressGroup order={order} orderId={orderId}></AddressGroup>
      </BlockStack>
    </AdminBlock>
  );
}