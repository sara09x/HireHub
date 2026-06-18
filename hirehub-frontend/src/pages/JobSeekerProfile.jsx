import { useState, useEffect } from 'react';
import { updateProfile, uploadResume } from '../services/api';   // هنضيفهم بعدين في api.js

function JobSeekerProfile() {
  const user = JSON.parse(
  localStorage.getItem("user")
);
  const [profile, setProfile] = useState({
    id: user?.id,

   fullName: user?.fullName || '',
   email: user?.email || '',
   phoneNumber: user?.phoneNumber || '',

   university: '',
   gpa: '',
   skills: '',
   projects: '',
   experience: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');
  

  // Fetch profile data when component loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const data = await getProfile();   // later when you have this API
        // setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleUploadResume = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setError('');

    try {

  const formData = new FormData();

  formData.append('resume', selectedFile);

  const res = await uploadResume(1, formData);

  console.log(res);

  setUploadSuccess(true);

  alert("Resume uploaded successfully!");

} catch (err) {

  setError('Failed to upload resume');

  console.error(err);

  alert("Upload failed");

} finally {

  setIsUploading(false);
}
  };

const handleSaveProfile = async () => {
  setIsSaving(true);
  setError('');
  setSaveSuccess(false);

  try {
    const res = await updateProfile(profile);

    console.log("SAVE RESPONSE:", res);

    if (res) {
      setSaveSuccess(true);
      alert("Profile saved successfully!");
    } else {
      throw new Error("No response from server");
    }

    setTimeout(() => setSaveSuccess(false), 3000);

  } catch (err) {
    console.error(err);
    setError('Failed to save profile. Please try again.');
    alert("Save failed");
  } finally {
    setIsSaving(false);
  }
};


  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto mt-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">My Academic Profile</h1>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">{error}</div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">
        
        {/* Avatar & Name */}
        <div className="flex items-center space-x-6">
          <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-4xl font-bold">
            {profile.fullName?.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{profile.fullName}</h2>
            <p className="text-gray-500 text-lg">Fresh Graduate</p>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Academic Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
            <input 
              type="text" 
              name="university"
              value={profile.university}
              onChange={handleChange}
              placeholder="e.g., Cairo University" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cumulative GPA</label>
            <input 
              type="text" 
              name="gpa"
              value={profile.gpa}
              onChange={handleChange}
              placeholder="e.g., 3.8" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition" 
            />
          </div>
        </div>

        {/* Technical Skills */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Technical Skills</h3>
          <p className="text-sm text-gray-500 mb-2">Separate skills with commas</p>
          <textarea 
            name="skills"
            value={profile.skills}
            onChange={handleChange}
            rows="2" 
            placeholder="React, JavaScript, Tailwind CSS, Node.js..." 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition"
          ></textarea>
        </div>

        {/* Projects & Courses */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">University Projects & Courses</h3>
          <textarea 
            name="projects"
            value={profile.projects}
            onChange={handleChange}
            rows="4" 
            placeholder="Describe your graduation project and relevant courses..." 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition"
          ></textarea>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Experience (Internships, Volunteer...)</h3>
          <textarea 
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            rows="3" 
            placeholder="Describe any previous experience..." 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition"
          ></textarea>
        </div>

        {/* Resume Upload */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Resume / CV</h3>
          
          {!selectedFile && !uploadSuccess && (
            <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-blue-50 hover:border-blue-400 transition cursor-pointer">
              <input 
                type="file" 
                className="hidden" 
                accept=".pdf,.doc,.docx" 
                onChange={handleFileChange} 
              />
              {/* ... same nice UI you had ... */}
              <p className="text-sm text-gray-700 font-medium">Click to upload your PDF resume</p>
            </label>
          )}

          {selectedFile && !uploadSuccess && (
            <div className="border border-blue-200 bg-blue-50 rounded-xl p-6 flex justify-between items-center">
              <p className="font-medium">{selectedFile.name}</p>
              <button 
                onClick={handleUploadResume}
                disabled={isUploading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          )}

          {uploadSuccess && (
            <div className="border border-green-200 bg-green-50 rounded-xl p-6">
              ✅ Resume uploaded successfully!
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button 
            onClick={handleSaveProfile}
            disabled={isSaving}
            className={`font-bold py-3.5 px-12 rounded-xl transition shadow-md flex items-center gap-3 text-lg ${
              saveSuccess ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSaving && <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>}
            {saveSuccess ? '✓ Profile Saved' : isSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobSeekerProfile;