import mongoose from "mongoose";

let Hostel;

try {
  Hostel = mongoose.model("Hostel");
} catch (error) {
  const hostelSchema = mongoose.Schema(
    {
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      image: { type: String, required: true },
      hostelName: { type: String, trim: true, required: true },
      address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        district: { type: String, trim: true },
        state: { type: String, trim: true },
        postalCode: { type: String, trim: true },
        coordinates: {
          latitude: { type: Number, required: true },
          longitude: { type: Number, required: true },
        },
      },
      foodMenu: { type: String, trim: true },
      contactNumber: { type: String, required: true },
      numberOfRooms: { type: Number, required: true },
      roomTypes: [
        {
          type: {
            type: String,
            unique: true,
            enum: ["Single", "Double", "Triple", "Four", "Five"],
            required: true,
          },
          price: { type: Number, required: true },
          numberOfRooms: { type: Number, required: true },
          selected: { type: Boolean, default: false },
          id: { type: Number, required: true },
        },
      ],
      numberOfFloors: { type: Number, required: true },
    },
    {
      timestamps: true,
    }
  );

  Hostel = mongoose.model("Hostel", hostelSchema);
}

export default Hostel;

// hostel information:-
// {
//   "owner_id": ref user,
//   "hostelName": "Example Hostel",
//   "address": {
//       "street": "123 Main Street",
//       "city": "City",
//       "state": "State",
//       "postalCode": "12345",
//       "country": "Country",
//       "coordinates": {
//          "latitude": 12.345678,
//          "longitude": 45.678901
//       }
//    },
//    food_menu: {veg:[],non-veg:[]},
//   "contactNumber": "+1234567890"
// }
