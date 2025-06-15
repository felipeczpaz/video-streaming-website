/*
************************************************************
*                                                          *
*   Flowhooks Software - Open Source License               *
*                                                          *
*  This software is licensed under the GNU Affero General   *
*  Public License v3. You may use, modify, and distribute   *
*  this code under the terms of the AGPLv3.                *
*                                                          *
*  This program is distributed in the hope that it will be  *
*  useful, but WITHOUT ANY WARRANTY; without even the       *
*  implied warranty of MERCHANTABILITY or FITNESS FOR A     *
*  PARTICULAR PURPOSE. See the GNU AGPLv3 for more details. *
*                                                          *
*  Author: Felipe Cezar Paz (git@felipecezar.com)          *
*  File:                                                   *
*  Description:                                            *
*                                                          *
************************************************************
*/

/*
************************************************************
*                                                          *
*   Flowhooks Software - Open Source License               *
*                                                          *
*  This software is licensed under the GNU Affero General   *
*  Public License v3. You may use, modify, and distribute   *
*  this code under the terms of the AGPLv3.                *
*                                                          *
*  This program is distributed in the hope that it will be  *
*  useful, but WITHOUT ANY WARRANTY; without even the       *
*  implied warranty of MERCHANTABILITY or FITNESS FOR A     *
*  PARTICULAR PURPOSE. See the GNU AGPLv3 for more details. *
*                                                          *
*  Author: Felipe Cezar Paz (git@felipecezar.com)          *
*  File:                                                   *
*  Description:                                            *
*                                                          *
************************************************************
*/

import React from "react";

const Home: React.FC = () => {
  const videos = [
    {
      id: 1,
      title: "Video 1",
      thumbnail: "https://placehold.co/300x150/EEE/31343C?text=Video+1",
    },
    {
      id: 2,
      title: "Video 2",
      thumbnail: "https://placehold.co/300x150/EEE/31343C?text=Video+2",
    },
    {
      id: 3,
      title: "Video 3",
      thumbnail: "https://placehold.co/300x150/EEE/31343C?text=Video+3",
    },
    {
      id: 4,
      title: "Video 4",
      thumbnail: "https://placehold.co/300x150/EEE/31343C?text=Video+4",
    },
  ];

  return (
    <div className="text-center p-6 mt-20">
      <h1 className="text-3xl font-bold mb-6">Video Streaming Homepage</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-auto"
            />
            <h2 className="text-lg font-semibold text-left p-4">
              {video.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
