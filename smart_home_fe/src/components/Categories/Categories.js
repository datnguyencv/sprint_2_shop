import React from "react";
import "./Categories.css";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <div className="col">
        <div className="row">
          <img
            src="https://s.alicdn.com/@sc04/kf/H154748c44daf4ec8949d61e343937ee2R.jpg_960x960.jpg"
            alt=""
          />
          <button>
            <Link className="link-name" to="/products/1">
              Robot
            </Link>
          </button>
        </div>
        <div className="row">
          <img
            src="https://s.alicdn.com/@sc04/kf/Hed0e6fa284eb46cba4a3b80505d476c4o.jpg_300x300.jpg"
            alt=""
          />
          <button>
            <Link to="/products/1" className="link-name">
              Cleaner Robot
            </Link>
          </button>
        </div>
      </div>
      <div className="col">
        <div className="row">
          {" "}
          <img
            src="https://s.alicdn.com/@sc04/kf/H00549d5bd4de4a6ba22a72ea4c488444U.png_300x300.png"
            alt=""
          />
          <button>
            <Link to="/products/1" className="link-name">
              Manager Robot
            </Link>
          </button>
        </div>
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="col">
            <div className="row">
              <img
                src="https://s.alicdn.com/@sc04/kf/H4d21ef2e91954e4dbdd2598da971262f9.jpg_300x300.jpg"
                alt=""
              />
              <button>
                <Link to="/products/1" className="link-name">
                  Chicken Tools
                </Link>
              </button>
            </div>
          </div>
          <div className="col">
            <div className="row">
              {" "}
              <img
                src="https://s.alicdn.com/@sc04/kf/H156ac60457724b2f9e64cc3e854271eeK.jpg_300x300.jpg"
                alt=""
              />
              <button>
                <Link to="/products/1" className="link-name">
                  Smart tools
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <img
            src="https://s.alicdn.com/@sc04/kf/H2cd66c7f3659422d8665d06af17942fa0.jpg_300x300.jpg"
            alt=""
          />
          <button>
            <Link to="/products/1" className="link-name">
              Garden equipment
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
