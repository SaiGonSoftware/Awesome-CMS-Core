import React from "react";
import RecentPost from "./RecentPost";
import PostList from "./PostList";
import PopularPosts from "./PopularPosts";

import Social from "Shared/Social";
import AuthorDetail from "Shared/AuthorDetail";
import Facebook from "Shared/Facebook";
import Category from "Shared/Category";
import NewsLetter from "Shared/NewsLetter";
import TrendingPosts from "Shared/TrendingPosts";

type PostContainerProps = {
  vm?: object
};
const PostContainer: React.SFC<PostContainerProps> = props => {
  return (
    <div className="row">
      <div className="col-lg-8 col-md-8 col-sm-12 col-12">
        {props.vm.posts.map(post => {
          return <PostList key={post.id} post={post} />;
        })}
      </div>
      <div className="col-lg-4 col-md-4 col-sm-12 col-12">
        <aside className="sidebar">
          <div className="sidebar-inner">
            <AuthorDetail />
            <Social />
            <RecentPost recentPost={props.vm.recentPost} />{" "}
            {props.vm.popularPosts.map(popularPost => {
              return (
                <PopularPosts key={popularPost.id} popularPost={popularPost} />
              );
            })}
            <Facebook />
            <Category categories={props.vm.categories} />
            <TrendingPosts />
            <NewsLetter />
          </div>
        </aside>
      </div>
    </div>
  );
};
export default PostContainer;
