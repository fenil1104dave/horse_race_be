import { Schema, Document } from "mongoose";

export const applyIdVirtual = <T extends Document>(schema: Schema<T>) => {
    schema.virtual("id").get(function (this: T) {
        return this._id.toHexString();
    });

    schema.set("toJSON", {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            delete ret._id;
        },
    });

    schema.set("toObject", {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            delete ret._id;
        },
    });
};
