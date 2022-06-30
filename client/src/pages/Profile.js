import { useEffect, useState } from 'react';
import { getCurrentUserProfile, getTopArtists } from '../spotify';
import { catchErrors } from '../utils';
import '../App.css';

const Profile = () => {

  const [profile, setProfile] = useState(null);
  const [topArtists, setTopArtists] = useState(null);

  useEffect(() => {
    // Get user profile data
    const fetchUserProfileData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);
      
      const userTopArtists = await getTopArtists();
      setTopArtists(userTopArtists.data);
    }

    catchErrors(fetchUserProfileData());
  }, [])

  return (
    <>
      {profile && (
        <div>
          <h1>{profile.display_name}</h1>
          <p>{profile.followers.total} Followers</p>
          {profile.images.length && profile.images[0].url && (
            <img src={profile.images[0].url} alt="Profile Picture" />
          )}
        </div>
      )}
    </>
  );
};

export default Profile;