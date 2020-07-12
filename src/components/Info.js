import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import postOffcieImage from "../assets/post-office-icon.png";
import logo from '../assets/logo.png'
import og from '../assets/og.png'
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    background: {
        postion: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0058a3",
    },
    root: {
        // marginTop: "10vh",
        // marginBottom: "10vh",
        // marginLeft: "10vw",
        // marginRight: "10vw",
        width: "100vw",
        height: "100vh",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RecipeReviewCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (

        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" src={postOffcieImage}>
                        郵
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        {/* <MoreVertIcon /> */}
                    </IconButton>
                }
                title="郵局地圖 設定工具 使用注意事項"
                subheader="2020/07/13 更新"
            />
            <CardMedia
                className={classes.media}
                image={og}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body1" color="textSecondary" component="p">
                    1. 使用前請先至 Line Chatbot 對話框中輸入各郵局專屬密碼以進行綁定。
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    2. 確認所選擇郵局正確無誤，並依據現場實際的叫號與號碼牌發放的情況來更新資料。
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    3. 資料更新方式: 點選要更新的內容(目前叫號與以發放的號碼牌數量)後，使用下方按鈕進行資料輸入；或按下右邊的編輯鈕直接輸入數字編輯。
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    4. 問題回報: 
                    {/* <a href="https://map.cardbo.info">https://map.cardbo.info</a>。 */}
                </Typography>
            </CardContent>
            <Link to="/">
                <Button fullWidth={true} variant="contained" color="primary" style={{ backgroundColor: "#0058a3" }}>
                    回到報號管理
                </Button>
            </Link>
        </Card>

    );
}