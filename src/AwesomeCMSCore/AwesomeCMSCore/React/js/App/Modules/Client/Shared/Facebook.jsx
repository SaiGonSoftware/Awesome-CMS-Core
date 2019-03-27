import React from 'react';

const Facebook = () => {
	return (
		<div className="widget widget-facebook-page-box wow fadeInUp">
			<div className="widget-content">
				<div className="widget-title">
					<h2>Facebook page</h2>
				</div>
				<div className="widget-extra-info-holder">
					<iframe
						src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
						scrolling="no"
						frameBorder="0"
						allow="encrypted-media"></iframe>
				</div>
			</div>
		</div>
	)
}

Facebook.propTypes = {}

export default Facebook;
