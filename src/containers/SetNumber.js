import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import ReactLoading from 'react-loading';


import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import postOffcieImage from "../assets/post-office-icon.png";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';
import HelpIcon from '@material-ui/icons/Help';
import Modal from '@material-ui/core/Modal';
import DoneIcon from '@material-ui/icons/Done';
// Liff
const liff = window.liff;

const useStyles = (theme) => ({
    root: {
        width: "100vw",
        height: "100vh",
    },
    loading: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0058a3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {

    },
    Card: {
        width: "100%",
        height: "100vh",
        overflow: "scroll",
    },
    CardContent: {
        display: "flex column",
        justifyContent: "space-start",
        paddingTop: 0,
        textAlign: "center"
    },
    Tabs: {
        width: "20vw",
        height: "40vw",
    },
    SettingHolder: {
        width: "100%",
    },
    Setting: {
        fontSize: "5vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "35vw",
        maxWidth: "100vw",

        padding: "5px",
        margin: "20px",
        // border: "solid 5px #000",
        "border-radius": "5vw",
        transition: "box-shadow 0.2s"
    },
    SettingText: {
        width: "80vw",
        fontSize: "25vw",
        overflow: "scroll",
    },
    ButtonHolder: {
        display: "flex",
        justifyContent: "space-around",
    },
    settingButton: {
        width: "30vw",
        height: "20vw",
        fontSize: "15vw",
        textAlign: "right",
        color: "#0058a3"
    },
    IconButton: {
        width: "8vw",
        height: "8vw",
        margin: "0",
        padding: "0",
    },
    CircularProgress: {
        color: "#0058a3"
    },
    Divider: {
        margin: "1rem",
    },
    modalTextFieldHolder: {
        width: "80vw",
        height: "40vw",
        backgroundColor: "#fff",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "border-radius": "2vw",
    },
    modalTextField: {

    }
});

class SetNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingSetNow: false,
            loadingSetTotal: false,
            now: 0,
            total: 0,

            focusedMark: undefined,
            fetchData: false,

            redirect: false,
            postData: [],
            focusedData: 0,

            openModal: false,
            lineID: undefined,

            postNm: "網際網路錯誤",
            postCd: "網際網路錯誤",
            inputBuffet: ""
        }
        this.modalTextRef = React.createRef();
    }

    componentWillMount = () => {
        liff.init({
            liffId: "1654394004-N82p5wP9"
        }).then(() => {
            if (!liff.isLoggedIn()) {
                liff.login({ redirectUri: ("https://3000postsetting.cardbo.info/") });
                console.log("not logged in")
            }
        }).catch(function (error) {
            console.log("[Error] " + error);
        }).then(
            () => liff.getProfile()
        ).catch(function (error) {
            console.log("[Error] " + error);
        }).then((profile) => {
            if (!profile) {
                console.log("USER PROFILE ERROR!");
                this.createNotification("error", "無法載入資料", "請確認網路連線狀況");
            } else {
                console.log(profile.userId);
                this.setState({
                    lineID: profile.userId,
                });
            }
        }).then(() => {
            fetch('/api/getData', {
                method: 'post',
                body: JSON.stringify({ lineID: this.state.lineID })
            }).catch(function (error) {
                console.log("[Error] " + error);
            }).then(
                res => {
                    if (res.ok) {
                        return res.json()
                    }
                    else {
                        this.createNotification("error", "無法載入資料", "請確認網路連線狀況");
                        return null;
                    }
                }
            )
        }).then((data) => {
            if (data) {
                var number_plate_updateTime = new Date(data.number_plate_updateTime);
                this.setState(
                    {
                        storeNm: data.storeNm,
                        storeCd: data.storeCd,
                        number_plate_updateTime: number_plate_updateTime,
                        total: data.number_plate_total,
                        now: data.number_plate_now,
                        loading: false
                    }
                );
            } else {
                this.setState(
                    { loading: false }
                );
            }
        });
    }

    componentDidMount = () => {
        setInterval(() => {
            if (!this.state.loading) {
                fetch('/api/getData', {
                    method: 'post',
                    body: JSON.stringify({ lineID: this.state.lineID })
                }).catch(function (error) {
                    console.log("[Error] " + error);
                }).then(
                    res => {
                        if (res.ok) {
                            return res.json()
                        }
                        else {
                            return null;
                        }
                    }
                ).then((data) => {
                    if (data) {
                        var number_plate_updateTime = new Date(data.number_plate_updateTime);
                        this.setState(
                            {
                                number_plate_updateTime: number_plate_updateTime,
                                total: data.number_plate_total,
                                now: data.number_plate_now,
                            }
                        );
                    }
                });
            }
        }, 500);
    }

    createNotification = (type, title, message) => {
        switch (type) {
            case 'info':
                NotificationManager.info(message, title, 2000);
                break;
            case 'success':
                NotificationManager.success(message, title, 2000);
                break;
            case 'warning':
                NotificationManager.warning(message, title, 2000, () => { this.getUserLocation(); });
                break;
            case 'error':
                NotificationManager.error(message, title, 2000);
                break;
        }
    }

    handleChangeFocus = (e, index) => {
        e.preventDefault();
        this.setState({ focusedData: index });
    }

    setNumber = (e, num) => {
        e.preventDefault();
        if (this.state.focusedData === 0) {
            var now = this.state.now;
            now = now + num;
            this.setState(
                { now: now }, this.handleSave());
        } else if (this.state.focusedData === 1) {
            var total = this.state.total;
            total = total + num;
            this.setState({ total: total }, this.handleSave());
        }
    }

    handleOpenModal = () => {
        this.setState({ openModal: true })
    }

    handleCloseModal = () => {
        this.setState({ openModal: false })
    }

    handleModalChange = (e) => {
        this.setState({ inputBuffet: e.target.value })
    }

    handleModalSave = () => {
        const newData = parseInt(this.state.inputBuffet);
        if (!Number.isInteger(newData)) {
            this.createNotification("error", "輸入非整數資料", "請確認輸入法");
        } else {
            this.handleCloseModal();
            if (this.state.focusedData === 0) {
                var now = this.state.now;
                now = this.state.inputBuffet;
                this.setState(
                    { now: now }, this.handleSave());
            } else if (this.state.focusedData === 1) {
                var total = this.state.total;
                total = this.state.inputBuffet;
                this.setState({ total: total }, this.handleSave());
            }
        }
    }

    handleSave = () => {
        if (this.state.now || this.state.total) {
            if (this.state.focusedData === 0) {
                const now = this.state.now;
                this.setState(
                    { now: now, loadingSetNow: true },
                    () => {
                        fetch('/api/setData', {
                            method: 'post',
                            body: JSON.stringify({ now: now, lineID: this.state.lineID })
                        }).catch(function (error) {
                            console.log("[Error] " + error);
                        }).then(
                            res => {
                                this.setState({ loadingSetNow: false });
                                if (!res.ok) {
                                    this.createNotification("error", "無法載入資料", "請確認網路連線狀況");
                                }
                            }
                        )
                    }
                );
            } else if (this.state.focusedData === 1) {
                const total = this.state.total;
                this.setState({ total: total, loadingSetTotal: true },
                    () => {
                        fetch('/api/setData', {
                            method: 'post',
                            body: JSON.stringify({ total: total, lineID: this.state.lineID })
                        }).catch(function (error) {
                            console.log("[Error] " + error);
                        }).then(
                            res => {
                                this.setState({ loadingSetTotal: false });
                                if (!res.ok) {
                                    this.createNotification("error", "無法載入資料", "請確認網路連線狀況");
                                }
                            }
                        )
                    }
                );
            }
        }
    }

    render() {
        const { classes } = this.props;
        const focusStyle = { color: "#000", boxShadow: "0 0 0 10pt #0058a3" };
        const notfocusStyle = { color: "#ddd", boxShadow: "0 0 0pt 0pt #fff" };


        if (this.state.loading) {
            return (
                <div className={classes.loading}>
                    <ReactLoading type={'cubes'} color={'#ffffff'} height={'90vw'} width={'90vw'} />
                </div>
            );
        }
        else {
            return (
                <Card className={classes.Card}>
                    <CardHeader
                        style={{ fontSize: "10vw" }}
                        avatar={
                            <Avatar aria-label="中華郵政" className={classes.avatar} src={postOffcieImage} >
                                郵
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings" component={Link} to="/info">
                                <HelpIcon />
                            </IconButton>
                        }
                        title={this.state.postNm}
                        subheader={this.state.postCd}
                    />
                    <div className={classes.CardContent}>
                        <div className={classes.SettingHolder}>
                            <div className={classes.Setting}
                                style={this.state.focusedData === 0 ? focusStyle : notfocusStyle}
                                onClick={e => this.handleChangeFocus(e, 0)}>
                                {/* <IconButton className={classes.IconButton}>
                                    <SendIcon />
                                </IconButton> */}
                                現<br />在<br />叫<br />號
                                <div className={classes.SettingText}>
                                    {this.state.now}
                                </div>
                                {this.state.loadingSetNow ? (
                                    <CircularProgress className={classes.CircularProgress} />) : (
                                        <IconButton className={classes.IconButton} onClick={this.handleOpenModal}>
                                            <EditIcon />
                                        </IconButton>
                                    )}
                            </div >
                            <div className={classes.Setting}
                                style={this.state.focusedData === 0 ? notfocusStyle : focusStyle}
                                onClick={e => this.handleChangeFocus(e, 1)}>
                                發<br />放<br />號<br />碼
                                <div className={classes.SettingText}>
                                    {this.state.total}
                                </div>
                                {this.state.loadingSetTotal ?
                                    (<CircularProgress className={classes.CircularProgress} />) : (
                                        <IconButton className={classes.IconButton} onClick={this.handleOpenModal}>
                                            <EditIcon />
                                        </IconButton>
                                    )}
                            </div>
                        </div>
                        <div className={classes.ButtonHolder}>
                            <ButtonGroup
                                orientation="vertical"
                                color="primary"
                                aria-label="vertical outlined primary button group"
                            >
                                <Button className={classes.settingButton} onClick={e => this.setNumber(e, 10)}>+10</Button>
                                <Button className={classes.settingButton} onClick={e => this.setNumber(e, -10)}>-10</Button>
                            </ButtonGroup>
                            <ButtonGroup
                                orientation="vertical"
                                color="primary"
                                aria-label="vertical outlined primary button group"
                            >
                                <Button className={classes.settingButton} onClick={e => this.setNumber(e, 5)}>+5</Button>
                                <Button className={classes.settingButton} onClick={e => this.setNumber(e, -5)}>-5</Button>
                            </ButtonGroup>
                            <ButtonGroup
                                orientation="vertical"
                                color="primary"
                                aria-label="vertical outlined primary button group"
                            >
                                <Button className={classes.settingButton} onClick={e => this.setNumber(e, 1)}>+1</Button>
                                <Button className={classes.settingButton} onClick={e => this.setNumber(e, -1)}>-1</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                    <Modal
                        open={this.state.openModal}
                        onClose={this.handleCloseModal}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div className={classes.modalTextFieldHolder}>
                            <TextField
                                onChange={this.handleModalChange}
                                ref={this.modalTextRef}
                                className={classes.modalTextField}
                                id="outlined-read-only-input"
                                label={this.state.focusedData === 0 ? "現在叫號" : this.state.focusedData === 1 ? "發放號碼" : "資料錯誤"}
                                defaultValue={this.state.focusedData === 0 ? this.state.now : this.state.focusedData === 1 ? this.state.total : "資料錯誤"}
                                variant="outlined"
                            />
                            <IconButton className={classes.IconButton} style={{ color: "" }} onClick={this.handleModalSave}>
                                <DoneIcon />
                            </IconButton>
                        </div>

                    </Modal>
                    <NotificationContainer />
                </Card >
            )
        }
    }
};
export default withStyles(useStyles)(SetNumber)