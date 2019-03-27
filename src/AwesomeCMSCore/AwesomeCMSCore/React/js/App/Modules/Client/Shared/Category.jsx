import React from 'react'
import PropTypes from 'prop-types'

const Category = props => {
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
																		<a href="#">{categorie}</a>
																</li>
														)
												})}
										</ul>
								</div>
						</div>
				</div>
		)
}

Category.propTypes = {
		categories: PropTypes.string
}

export default Category
