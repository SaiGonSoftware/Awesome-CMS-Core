import React from "react";
import { Badge, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

type CommentContainerHeaderProps = {
  comments?: object,
  activeTab?: string,
  toggle?: (...args: any[]) => any
};

const CommentContainerHeader: React.SFC<CommentContainerHeaderProps> = props => {
  return (
    <Nav tabs>
      <NavItem>
        <NavLink
          className={classnames({
            active: props.activeTab === "All"
          })}
          onClick={() => {
            props.toggle("All");
          }}
        >
          All &nbsp;
          <Badge color="secondary">{props.comments.numberOfComments}</Badge>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({
            active: props.activeTab === "Pending"
          })}
          onClick={() => {
            props.toggle("Pending");
          }}
        >
          Pending &nbsp;
          <Badge color="secondary">
            {props.comments.numberOfPendingComments}
          </Badge>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({
            active: props.activeTab === "Approved"
          })}
          onClick={() => {
            props.toggle("Approved");
          }}
        >
          Approved &nbsp;
          <Badge color="secondary">
            {props.comments.numberOfApprovedComments}
          </Badge>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({
            active: props.activeTab === "Spam"
          })}
          onClick={() => {
            props.toggle("Spam");
          }}
        >
          Spam &nbsp;
          <Badge color="secondary">{props.comments.numberOfSpamComments}</Badge>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({
            active: props.activeTab === "Trash"
          })}
          onClick={() => {
            props.toggle("Trash");
          }}
        >
          Deleted &nbsp;
          <Badge color="secondary">
            {props.comments.numberOfDeletedComments}
          </Badge>
        </NavLink>
      </NavItem>
    </Nav>
  );
};
export default CommentContainerHeader;
