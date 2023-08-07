import Categories from "./Admin/Category";
import DisplayAllCategories from "./Admin/DisplayAllCategories";
import DisplayAllSubCategories from "./Admin/DisplayAllSubCategories";
import Companies from "./Admin/Company";
import SubCategory from "./Admin/SubCategory";
import DisplayAllCompanies from "./Admin/DisplayAllCompanies";
import Products from "./Admin/Product";
import DisplayAllProducts from "./Admin/DisplayAllProducts"
import Colors from "./Admin/Color";
import DisplayAllColors from "./Admin/DisplayAllColors";
import Models from "./Admin/Model";
import DisplayAllModels from "./Admin/DisplayAllModels";
import FinalProduct from "./Admin/FinalProduct";
import DisplayAllFinalProducts from "./Admin/DisplayAllFinalProduct"; 
import AdminLogin from "./Admin/AdminLogin"
import Dashboard from "./Admin/Dashboard"
import Banners from "./Admin/Banner";
import DisplayAllBanners from "./Admin/DisplayAllBanners";
import {Route,BrowserRouter as Router} from "react-router-dom"
import Header from "./UserInterface/Header";
import Home from "./UserInterface/Home"
import DisplayMorePictures from "./Admin/DisplayMorePictures"
import Footer from "./UserInterface/Footer";
import ProductList from "./UserInterface/ProductList"
import SignIn from "./UserInterface/SignIn";
import SignUp from "./UserInterface/SignUp";
import ShoppingCartComponent from "./UserInterface/ShoppingCartComponent";
import SideBar from "./UserInterface/SideBar"
import SubBanner from "./Admin/SubBanner";
import DisplayAllSubbanner from "./Admin/DisplayAllSubbanner";
import ProductPreview from "./UserInterface/ProductPreview";
import OrderSummary from "./UserInterface/OrderSummary"
import PaymentGateway from "./UserInterface/PaymentGateway"

function App(props) {
  return (
    <div className="App">
      <Router>
        <Route strict history={props.history} component={Categories} path="/categories"/>
        <Route strict history={props.history} component={DisplayAllCategories} path="/displayallcategories"/>
        <Route strict history={props.history} component={SubCategory} path="/subcategories"/>
        <Route strict history={props.history} component={DisplayAllSubCategories} path="/displayallsubcategories"/>
        <Route strict history={props.history} component={Companies} path="/companies"/>
        <Route strict history={props.history} component={DisplayAllCompanies} path="/displayallcompanies"/>
        <Route strict history={props.history} component={Products} path="/products"/>
        <Route strict history={props.history} component={DisplayAllProducts} path="/displayallproducts"/>
        <Route strict history={props.history} component={Colors} path="/colors"/>
        <Route strict history={props.history} component={DisplayAllColors} path="/displayallcolors"/>
        <Route strict history={props.history} component={Models} path="/models"/>
        <Route strict history={props.history} component={DisplayAllModels} path="/displayallmodels"/>
        <Route strict history={props.history} component={FinalProduct} path="/finalproducts"/>
        <Route strict history={props.history} component={DisplayAllFinalProducts} path="/displayallfinalproducts"/>
        <Route strict history={props.history} component={AdminLogin} path="/adminlogin"/>
        <Route strict history={props.history} component={Dashboard} path="/dashboard"/>
        <Route strict history={props.history} component={Banners} path="/banner"/>
        <Route strict history={props.history} component={DisplayAllBanners} path="/displayallbanners"/>
        <Route strict history={props.history} component={Header} path="/header"/>
        <Route strict history={props.history} component={Home} path="/home"/>
        <Route strict history={props.history} component={DisplayMorePictures} path="/displaymorepictures"/>
        <Route strict history={props.history} component={Footer} path="/footer"/>
        <Route strict history={props.history} component={ProductList} path="/ProductList"/>
        <Route strict history={props.history} component={SignIn} path="/signin"/>
        <Route strict history={props.history} component={SignUp} path="/signup"/>
        <Route strict history={props.history} component={ShoppingCartComponent} path="/shoppingcartcomponent"/>
        <Route strict history={props.history} component={SideBar} path="/sidebar"/>
        <Route strict history={props.history} component={SubBanner} path="/subbanner"/>
        <Route strict history={props.history} component={DisplayAllSubbanner} path="/displayallsubbanner"/>
        <Route strict history={props.history} component={ProductPreview} path="/productpreview"/>
        <Route strict history={props.history} component={OrderSummary} path="/ordersummary"/>
        <Route strict history={props.history} component={PaymentGateway} path="/paymentgateway"/>
      </Router>

    </div>
  );
}

export default App;
