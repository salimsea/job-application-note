import React from "react";
import { connect } from "react-redux";
import PageHeader from "../../../lib-components/PageHeader";
import ChatInbox from "../../../lib-components/ChatInbox";

class Chat extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { isInbox } = this.props;
    return (
      <div style={{ flex: 1 }}>
        <div>
          <div className="ng-star-inserted">
            <div className="container-fluid">
              <PageHeader
                HeaderText="Chat"
                Breadcrumb={[{ name: "App" }, { name: "Chat" }]}
              />
              <ChatInbox />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ mailInboxReducer }) => ({
  isInbox: mailInboxReducer.isInbox,
});

export default connect(mapStateToProps, {})(Chat);
