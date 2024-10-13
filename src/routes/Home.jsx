import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Welcome to PlanMyEscape</h1>
        <p className="lead">
          Your AI-powered vacation planner that helps you create the perfect
          getaway with ease.
        </p>
      </div>

      <div className="row align-items-center">
        {/* Main Image Placeholder */}
        <div className="col-lg-6">
          <img
            src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/315856868/original/da727705c5004f5a8f5ffbf22a0d034dcfc40909/plan-your-perfect-vacation.png" // Add your main image source here
            alt="Vacation Planning"
            className="img-fluid"
            style={{
              backgroundColor: "#e9ecef",
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>

        <div className="col-lg-6">
          <h2>Plan Your Perfect Vacation</h2>
          <p>
            Start by knowing how many days you'll need to request off from work.
            Simply input your vacation dates, and our AI will calculate the
            number of business days you need to take off, how many weekends are
            included, and any holidays that might be in the mix.
          </p>
          <p>
            Next, set your budget, and our AI will suggest vacation packages
            that suit you best. Choose whether you want a staycation or an
            overseas adventure—our system has it all covered.
          </p>
          <Link to="/plan" className="btn btn-primary mt-3">
            Start Planning Now
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="my-5">
        <h3 className="text-center">Why Choose PlanMyEscape?</h3>
        <div className="row mt-4">
          {/* Feature 1 Image Placeholder */}
          <div className="col-lg-4 text-center">
            <img
              src="https://static.wixstatic.com/media/11062b_ed197b1577c748a3a0c724ab999be9dc~mv2.jpg/v1/fill/w_1000,h_667,al_c,q_85,usm_0.66_1.00_0.01/11062b_ed197b1577c748a3a0c724ab999be9dc~mv2.jpg" // Add Feature 1 image source here
              alt="Time-Off Planning"
              className="img-fluid"
              style={{
                backgroundColor: "#e9ecef",
                width: "100%",
                height: "200px",
                objectFit: "cover",
                marginBottom: "15px",
                borderRadius: "20px",
              }}
            />
            <h5>Customized Time-Off Planning</h5>
            <p>
              Get an accurate breakdown of your vacation days, weekends, and
              holidays with ease.
            </p>
          </div>

          {/* Feature 2 Image Placeholder */}
          <div className="col-lg-4 text-center">
            <img
              src="https://pmlholidays.com/admin/production/images/blogs/Maldives.jpg" // Add Feature 2 image source here
              alt="Budget-Friendly Packages"
              className="img-fluid"
              style={{
                backgroundColor: "#e9ecef",
                width: "100%",
                height: "200px",
                objectFit: "cover",
                marginBottom: "15px",
                borderRadius: "20px",
              }}
            />
            <h5>Budget-Friendly Packages</h5>
            <p>
              Our AI suggests travel packages tailored to your budget and
              vacation style.
            </p>
          </div>

          {/* Feature 3 Image Placeholder */}
          <div className="col-lg-4 text-center">
            <img
              src="https://www.bls.gov/opub/mlr/2015/images/paulin-article-image.jpg" // Add Feature 3 image source here
              alt="Domestic or Overseas Options"
              className="img-fluid"
              style={{
                backgroundColor: "#e9ecef",
                width: "100%",
                height: "200px",
                objectFit: "cover",
                marginBottom: "15px",
                borderRadius: "20px",
              }}
            />
            <h5>Domestic or Overseas Options</h5>
            <p>
              Decide whether you want to stay within your country or travel
              abroad—we’ll handle the rest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
