import styled from 'styled-components';

export default styled.div`
	border-radius: 4px;
	margin-bottom: 30px;
	box-shadow: 0px 1px 4px #bbb;
  background-color: #fff;

  h3.paneTitle {
  	font-size: 20px;
    color: #74797b;
    padding: 30px 15px;
    margin: 0;
    border-bottom: 2px solid #efefef;
    i {
        margin-right: 15px;
    }
  }
  div.paneContent {
		color: #8C9497;
  	padding: 15px;
  }

  div.profileButton {
  	margin: 0 0 20px;
  	p {
  		display: inline-block;
  		margin-right: 10px;
  		line-height: 30px;
  	}
  	.setting {
  		font-size: 11px;
  		text-decoration: none;
  		height: 30px;
  		line-height: 30px;
  		float: right;
  	}
  }

  div.profile {
  	margin: 10px 0 50px;
  	.avatar {
	    width: 90px;
	    height: 90px;
	    border-radius: 10px;
	    overflow: hidden;
	    margin-right: 30px;
	    display: inline-block;
  	}

  	.userInfo {
			display: inline-block;
			height: 90px;
			vertical-align: middle;
			padding: 20px 0;
			p {
				color: #8C9497;
				display: inline-block;
				width: 60px;
			}
			span {
		    color: #8C9497;  
			}
  	}
  }
`;
