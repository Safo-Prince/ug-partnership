import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import AdminTable from "../components/adminTable";

const Administrator: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <AdminTable />
      <Footer />
    </div>
  );
};

export default Administrator;
