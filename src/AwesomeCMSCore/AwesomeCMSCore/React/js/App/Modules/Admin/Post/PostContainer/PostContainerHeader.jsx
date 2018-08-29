import React from 'react'
import PropTypes from "prop-types";
import {Badge, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';

const PostContainerHeader = (props) => {
    return (
        <Nav tabs>
            <NavItem>
                <NavLink
                    className={classnames({
                    active: props.activeTab === 'Published'
                })}
                    onClick={() => {
                    props.toggle('Published');
                }}>
                    Published &nbsp;
                    <Badge color="secondary">{props.posts.numberOfPostPublished}</Badge>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classnames({
                    active: props.activeTab === 'Drafted'
                })}
                    onClick={() => {
                    props.toggle('Drafted');
                }}>
                    Drafted &nbsp;
                    <Badge color="secondary">{props.posts.numberOfDraftedPost}</Badge>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classnames({
                    active: props.activeTab === 'Deleted'
                })}
                    onClick={() => {
                    props.toggle('Deleted');
                }}>
                    Deleted &nbsp;
                    <Badge color="secondary">{props.posts.numberOfDeletedPost}</Badge>
                </NavLink>
            </NavItem>
        </Nav>
    )
}

PostContainerHeader.propTypes = {
    posts: PropTypes.object.isRequired,
    activeTab: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired
};

export default PostContainerHeader;
