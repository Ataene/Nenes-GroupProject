
import { Typography } from "@mui/material";
import { ProductMetaWrapper } from "../styles/product";
export default function ProductMeta({ product}) {
    return (
      <ProductMetaWrapper>
        <Typography  lineHeight={2}>
          {product.name}
        </Typography>
        <Typography >
          ${product.price}
        </Typography>
      </ProductMetaWrapper>
    );
}