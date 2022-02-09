import mongoose from 'mongoose';
import { Order, OrderStatus } from './order';

// An interface that describes the properties
// that are required to create a new ticket
interface TicketAttrs {
  id: string;
  title: string;
  price: number;
}

// An interface that describes the properties
// that a ticket document has
export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;

  isReserved(): Promise<boolean>;
}

// An interface that describes the properties
// that a ticket model has
// Returns an instance with ticketdoc instance
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      //   Transform the response to standardise across languages
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// Use the interface defined above.  Allows for type checking
// How to add a function to a model in mongoose
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
  });
};
ticketSchema.methods.isReserved = async function () {
  // this === the ticket document that we called isReserved on
  // Run query to look at all orders.  Find an order where the ticket is the ticket we found and the orders status is not cancelled
  // If we find an order from this, then the ticket is reserved
  const existingOrder = await Order.findOne({
    ticket: this as any,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  //   Ensures a boolean is returned, as defined in the interface
  return !!existingOrder;
};

// Use the interface above to add type definitions to the build property
// Pass in the OrderDoc interface and returns a OrderModel interface
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
