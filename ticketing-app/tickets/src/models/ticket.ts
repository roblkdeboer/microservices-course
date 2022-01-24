import mongoose from 'mongoose';

// Properties required to make a ticket
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// Properties a ticket has (can include additional fields added by MongoDB)
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

// Builds the model with TicketAttrs being used and expected TicketDoc
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
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      // Modify return directly
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id;
      },
    },
  }
);

// The only way to create new records
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

// Use the interface above to add type definitions to the build property
// Pass in the TicketDoc interface and returns a TicketModel interface
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };