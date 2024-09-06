import Product from "./Product";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div>
        <Product />
      </div>
    </div>
  );
};

export default Home;
