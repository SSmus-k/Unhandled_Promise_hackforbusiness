 const rawUsers = [
  {
    id: 1,
    name: "EcoTech Pvt. Ltd.",
    email: "eco@tech.com",
    password: "eco123",
    sector: "Tech",
    totalProducts: 200,
    waste_type: "Electronic",
    is_sustainable: true,
    isSubscribed: false,
    totalMaterials:500,
  },
  {
    id: 2,
    name: "AgroNepal",
    email: "contact@agronepal.com",
    password: "agro321",
    sector: "Agriculture",
    totalProducts: 120,
    waste_type: "Organic",
    is_sustainable: false,
    isSubscribed: false,
    totalMaterials:500,
  },
  {
    id: 3,
    name: "Himalayan Plastics",
    email: "info@himplast.com",
    password: "plast!456",
    sector: "Manufacturing",
    totalProducts: 500,
    waste_type: "Plastic",
    is_sustainable: false,
    isSubscribed: false,
    totalMaterials:500,
  },
  {
    id: 4,
    name: "GreenMart",
    email: "support@greenmart.com",
    password: "green1234",
    sector: "Retail",
    totalProducts: 90,
    waste_type: "Mixed",
    is_sustainable: true,
    isSubscribed: false,
    totalMaterials:500,
  }
];

export const mockUsers = rawUsers.map(user => ({
  ...user,
  waste_amount: user.totalMaterials - user.totalProducts
}));
