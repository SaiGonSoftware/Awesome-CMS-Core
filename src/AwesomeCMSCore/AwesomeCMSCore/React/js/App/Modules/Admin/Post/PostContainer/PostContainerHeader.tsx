import React from "react";
import { Badge, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

type PostContainerHeaderProps = {
  posts: object,
  activeTab: string,
  toggle: (...args: any[]) => any
};

const PostContainerHeader: React.SFC<PostContainerHeaderProps> = props => {
  return (
    <Nav tabs>
      <NavItem>
        <NavLink
          className={classnames({
            active: props.activeTab === "Published"
          })}
          onClick={() => {
            props.toggle("Published");
          }}
        >
          Published &nbsp;
          <Badge color="secondary">{props.posts.numberOfPostPublished}</Badge>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({
            active: props.activeTab === "Drafted"
          })}
          onClick={() => {
            props.toggle("Drafted");
          }}
        >
          Drafted &nbsp;
          <Badge color="secondary">{props.posts.numberOfDraftedPost}</Badge>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({
            active: props.activeTab === "Deleted"
          })}
          onClick={() => {
            props.toggle("Deleted");
          }}
        >
          Deleted &nbsp;
          <Badge color="secondary">{props.posts.numberOfDeletedPost}</Badge>
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default PostContainerHeader;
