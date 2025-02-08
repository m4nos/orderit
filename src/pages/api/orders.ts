import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const orders = await prisma.order.findMany({
          include: { products: true }, // Include related products
        });
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;

    case 'POST':
      try {
        const { deliveryDate, customerName, status, totalPrice, productIds } = req.body;
        const newOrder = await prisma.order.create({
          data: {
            deliveryDate: new Date(deliveryDate),
            customerName,
            status,
            totalPrice,
            products: {
              connect: productIds.map((id: number) => ({ id })),
            },
          },
        });
        res.status(201).json(newOrder);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;

    case 'PATCH':
      try {
        const { id, status } = req.body;
        const updatedOrder = await prisma.order.update({
          where: { id },
          data: { status },
        });
        res.status(200).json(updatedOrder);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 