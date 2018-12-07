import React from "react";
type CategoryProps = {
  categories?: string
};
const Category: React.SFC<CategoryProps> = props => {
  const categories = JSON.parse(props.categories);
  return (
    <div className="widget widget-category wow fadeInUp">
      <div className="widget-content">
        <div className="widget-title">
          <h2>Category</h2>
        </div>
        <div className="widget-extra-info-holder">
          <ul className="widget-category-listings">
            {categories.map((categorie, index) => {
              return (
                <li key={index}>
                  <a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">
                    {categorie}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Category;
