import PageHeader from "./PageHeader";
import ProductList from "./ProductList";

function ManageProductHome() {
    return (
      <div id="manageProductMainContainer">
      <PageHeader title={"Product Management System"} id={"manageProductHeader"} />
        <main id="manageProductContent">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <ProductList />
          </div>
        </main>
      </div>
    );
  }

  export default ManageProductHome;