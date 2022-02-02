import mongoose from 'mongoose';
import { OrderStatus } from '@robtickets/common';
import { TicketDoc } from './ticket';

export { OrderStatus };

// An interface that describes the properties
// that are required to create a new order
interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  //   Interface defined in ticket model
  ticket: TicketDoc;
}

// An interface that describes the properties
// that a order document has
interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  //   Interface defined in ticket model
  ticket: TicketDoc;
}

// An interface that describes the properties
// that a order model has
// Returns an instance with orderdoc instance
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
      required: false,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
    },
  },
  {
    //   Transform the response to standardise across languages
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// Use the interface defined above.  Allows for type checking
// How to add a function to a model in mongoose
orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

// Use the interface above to add type definitions to the build property
// Pass in the OrderDoc interface and returns a OrderModel interface
const Order = mongoose.model<OrderDoc, OrderModel>('Order, orderSchema');

export { Order };
