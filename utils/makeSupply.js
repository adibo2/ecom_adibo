export async function makeSupply(codeData, productData) {
    for (let i = 0; i < codeData.length; i++) {
      const productType = codeData[i].type;
      for (let j = 0; j < codeData[i].codes.length; j++) {
        const productCode = codeData[i].codes[j].code;
        const isUsed = false; // assuming the product is unused
        if (!isUsed) {
          // find the matching slug from productData
          const matchingProduct = productData.find(
            product => product.slug === productType
          );
          if (matchingProduct) {
            // decrement the unused value by 1
            matchingProduct.unused -= 1;
            // save the updated product
            await matchingProduct.save();
          }
        }
      }
    }
  }