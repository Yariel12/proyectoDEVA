import Header from "../../components/headers";
import CreateProduct from "../../components/CreateProductPage";

function Products() {
  return (
    <div>
      <Header onDelete={() => {}} onSave={() => {}} />
      <CreateProduct />
    </div>
  );
}

export default Products;
