const carts = [
    {
      cart_id: 1,
      name: "Abstract Folded Plots",
      imagSrc:
        "https://blueskytechmage.com/kalles/media/catalog/product/cache/8fd6ecdf2e825b10abccdbdeb5a711b5/p/r/product-45_720x.jpg",
      price: "$100",
      description:
        "Caravus Classic Stethoscope is the most recent model of the stethoscope which helps millions of health care professionals achieve their very best.It brings new layout, materials, and engineering into the Caravus...",
      availablity: " In stock",
      sku: " HD-0012",
      categories: "Gift ideasKids & Babies",
    },
    {
      cart_id: 2,
      imagSrc:
        "https://blueskytechmage.com/kalles/media/catalog/product/cache/8fd6ecdf2e825b10abccdbdeb5a711b5/p/r/product-24_720x_1.jpg",
      name: "Adhesive Tape Dispanser",
      price: "$100",
      description:
        "Caravus Classic Stethoscope is the most recent model of the stethoscope which helps millions of health care professionals achieve their very best.It brings new layout, materials, and engineering into the Caravus...",
      availablity: " In stock",
      sku: " HD-002",
      categories: "Gift ideasKids & Babies",
    },
    {
      cart_id: 3,
      imagSrc:
        "https://blueskytechmage.com/kalles/media/catalog/product/cache/8fd6ecdf2e825b10abccdbdeb5a711b5/p/r/product-22_720x_1_2.jpg",
      name: "Pendant Key Ornaments",
      price: "$100",
      description:
        "Caravus Classic Stethoscope is the most recent model of the stethoscope which helps millions of health care professionals achieve their very best.It brings new layout, materials, and engineering into the Caravus...",
      availablity: " In stock",
      sku: "HD-004",
      categories: "Gift ideasKids & Babies",
    },
    {
      cart_id: 4,
      imagSrc:
        "https://blueskytechmage.com/kalles/media/catalog/product/cache/8fd6ecdf2e825b10abccdbdeb5a711b5/p/r/product-41_720x_1_2_1.jpg",
      name: "Antique Sewing Scissor",
      price: "$100",
      description:
        "Caravus Classic Stethoscope is the most recent model of the stethoscope which helps millions of health care professionals achieve their very best.It brings new layout, materials, and engineering into the Caravus...",
      availablity: " In stock",
      sku: "HD-005",
      categories: "Gift ideasKids & Babies",
    },
    {
      cart_id: 5,
      imagSrc:
        "https://blueskytechmage.com/kalles/media/catalog/product/cache/8fd6ecdf2e825b10abccdbdeb5a711b5/p/r/product-3_720x_1.png",
      name: "Motorized Tricycle",
      price: "$100",
      description:
        "Caravus Classic Stethoscope is the most recent model of the stethoscope which helps millions of health care professionals achieve their very best.It brings new layout, materials, and engineering into the Caravus...",
      availablity: " In stock",
      sku: "HD-007",
      categories: "Gift ideasToys",
    },
    {
      cart_id: 6,
      imagSrc:
        "https://blueskytechmage.com/kalles/media/catalog/product/cache/8fd6ecdf2e825b10abccdbdeb5a711b5/p/r/product-06_720x_1_1.jpg",
      name: "Modern Camera",
      price: "$100",
      description:
        "Caravus Classic Stethoscope is the most recent model of the stethoscope which helps millions of health care professionals achieve their very best.It brings new layout, materials, and engineering into the Caravus...",
      availablity: " In stock",
      sku: "HD-008",
      categories: "Gift ideasKids & Babies",
    },
    {
      cart_id: 7,
      imagSrc:
        "https://blueskytechmage.com/kalles/media/catalog/product/cache/8fd6ecdf2e825b10abccdbdeb5a711b5/p/r/product-16_720x_1_1_1.jpg",
      name: "LCD Writing Tablet",
      price: "$100",
      description:
        "Caravus Classic Stethoscope is the most recent model of the stethoscope which helps millions of health care professionals achieve their very best.It brings new layout, materials, and engineering into the Caravus...",
      availablity: " In stock",
      sku: " HD-009",
      categories: "Gift ideasKniting & Sewing",
    },
    {
      cart_id: 8,
      imagSrc:
        "https://blueskytechmage.com/kalles/media/catalog/product/cache/8fd6ecdf2e825b10abccdbdeb5a711b5/p/r/product-21_720x_2.jpg",
      name: "Antique Sewing Scisso",
      price: "$60",
      description:
        "Caravus Classic Stethoscope is the most recent model of the stethoscope which helps millions of health care professionals achieve their very best.It brings new layout, materials, and engineering into the Caravus...",
      availablity: " In stock",
      sku: "HD-0010",
      categories: "Gift ideasKniting & Sewing",
    },
    {
      cart_id: 9,
      imagSrc:
        "https://blueskytechmage.com/kalles/media/catalog/product/cache/8fd6ecdf2e825b10abccdbdeb5a711b5/p/r/product-54_720x_2.jpg",
      name: "Bouncer Measuring Cup",
      price: "$35",
      description:
        "Caravus Classic Stethoscope is the most recent model of the stethoscope which helps millions of health care professionals achieve their very best.It brings new layout, materials, and engineering into the Caravus...",
      availablity: " In stock",
      sku: "HD-0011",
      categories: "Gift ideasKids & Babies",
    },
    {
      cart_id: 10,
      imagSrc:
        "https://blueskytechmage.com/kalles/media/catalog/product/cache/8fd6ecdf2e825b10abccdbdeb5a711b5/p/r/product-54_720x_2.jpg",
  
      name: "Lucky Wooden Elephant",
      price: "$55",
      description:
        "Caravus Classic Stethoscope is the most recent model of the stethoscope which helps millions of health care professionals achieve their very best.It brings new layout, materials, and engineering into the Caravus...",
      availablity: " In stock",
      sku: "HD-0015",
      categories: "Gift ideasKids & Babies",
    },
    {
      cart_id: 11,
      imagSrc:
        "https://blueskytechmage.com/kalles/media/catalog/product/cache/8fd6ecdf2e825b10abccdbdeb5a711b5/p/r/product-46_720x.jpg",
      name: "Maison Meng Wood Painting",
      price: "$39",
      description:
        "Caravus Classic Stethoscope is the most recent model of the stethoscope which helps millions of health care professionals achieve their very best.It brings new layout, materials, and engineering into the Caravus...",
      availablity: " In stock",
      sku: "HD-0019",
      categories: "Gift ideasKids & BabiesKniting & Sewing",
    },
    
    {
      cart_id: 12,
      imagSrc:
        "https://blueskytechmage.com/kalles/media/catalog/product/cache/8fd6ecdf2e825b10abccdbdeb5a711b5/p/r/product-3_720x_1_4.png",
      name: "Abstract Folded Pots",
      price: "$39",
      description:
        "Caravus Classic Stethoscope is the most recent model of the stethoscope which helps millions of health care professionals achieve their very best.It brings new layout, materials, and engineering into the Caravus...",
      availablity: " In stock",
      sku: "HD-0012",
      categories: "Gift ideasKids & Babies",
    },
    {
      cart_id: 13,
      imagSrc:
        "https://blueskytechmage.com/kalles/media/catalog/product/cache/8fd6ecdf2e825b10abccdbdeb5a711b5/p/r/product-13_720x.jpg",
      name: "Digital Camera System",
      price: "$23",
      description:
        "Caravus Classic Stethoscope is the most recent model of the stethoscope which helps millions of health care professionals achieve their very best.It brings new layout, materials, and engineering into the Caravus...",
      availablity: " In stock",
      sku: "HD-006",
      categories: "Gift ideasToys",
    },
  ];
 module.exports = carts
  