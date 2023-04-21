import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";
import moment from "moment";

//2a2beef15bf948e6bbf60a89bfcc282e

//It is a function to truncate the description text if its too long
function truncate(string, n) {
  //n is the no of character
  return string?.length > n ? string.substr(0, n - 1) + "..." : string;
}

const NewsCard = ({ newInfo }) => {
  return (
    <div className="m-2 mt-5 space-x-4">
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            // image="https://i.ytimg.com/vi/id0PK7fJ92k/maxresdefault.jpg"
            image={
              newInfo?.urlToImage
                ? newInfo?.urlToImage
                : "https://i.ytimg.com/vi/id0PK7fJ92k/maxresdefault.jpg"
            }
            alt="green iguana"
          />
          <CardContent>
            <h2 className="text-sm font-semibold pb-5">
              {truncate(newInfo?.title, 50)}
            </h2>
            {/* <Typography gutterBottom variant="inherit" color="text.secondary" className="font-semibold"> */}
            {/* </Typography> */}
            {/* <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography> */}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <div className="text-xs text-slate-500">
            {moment(newInfo?.publishedAt, "YYYYMMDD").fromNow()}
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default NewsCard;
