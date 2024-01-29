import fs from 'fs/promises'

export async function POST(req) {
    const order = await req.json();
    const orderData = order.order
    
    if (
      orderData.customer.email === null ||
      !orderData.customer.email.includes('@') ||
      orderData.customer.name === null ||
      orderData.customer.name.trim() === '' ||
      orderData.customer.street === null ||
      orderData.customer.street.trim() === '' ||
      orderData.customer['postal-code'] === null ||
      orderData.customer['postal-code'].trim() === '' ||
      orderData.customer.city === null ||
      orderData.customer.city.trim() === ''
    ) {
      return Response.json({
        message:
          'Missing data: Email, name, street, postal code or city is missing.',
      });
    }
  
    const newOrder = {
      ...orderData,
      id: (Math.random() * 1000).toString(),
    };
    const orders = await fs.readFile('./components/orders.json', 'utf8');
    const allOrders = JSON.parse(orders);
    allOrders.push(newOrder);
    await fs.writeFile('./components/orders.json', JSON.stringify(allOrders));
    return Response.json({ message: 'Order created!' });
  };