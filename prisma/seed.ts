import { PrismaClient, Product, Order } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Products
  const product1: Product = await prisma.product.create({
    data: {
      name: 'Product 1',
      price: 19.99,
    },
  });

  const product2: Product = await prisma.product.create({
    data: {
      name: 'Product 2',
      price: 29.99,
    },
  });

  const product3: Product = await prisma.product.create({
    data: {
      name: 'Product 3',
      price: 39.99,
    },
  });

  const product4: Product = await prisma.product.create({
    data: {
      name: 'Product 4',
      price: 49.99,
    },
  });

  // Seed Orders
  const order1: Order = await prisma.order.create({
    data: {
      deliveryDate: new Date('2023-12-01'),
      customerName: 'John Doe',
      status: 'pending',
      totalPrice: 49.98,
      products: {
        connect: [{ id: product1.id }, { id: product2.id }],
      },
    },
  });

  const order2: Order = await prisma.order.create({
    data: {
      deliveryDate: new Date('2023-12-05'),
      customerName: 'Jane Smith',
      status: 'completed',
      totalPrice: 89.98,
      products: {
        connect: [{ id: product3.id }, { id: product4.id }],
      },
    },
  });

  const order3: Order = await prisma.order.create({
    data: {
      deliveryDate: new Date('2023-12-10'),
      customerName: 'Alice Johnson',
      status: 'pending',
      totalPrice: 69.98,
      products: {
        connect: [{ id: product2.id }, { id: product3.id }],
      },
    },
  });

  console.log({ product1, product2, product3, product4, order1, order2, order3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 