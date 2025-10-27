export const demoAuth = {
  signIn: async (email: string, password: string) => {
    // Demo validation - any email/password works
    if (email && password) {
      let role = 'BUYER';
      let name = email.split('@')[0];
      
      if (email.includes('admin@example.com')) {
        role = 'ADMIN';
        name = 'Admin User';
      } else if (email.includes('producer@example.com')) {
        role = 'PRODUCER';
        name = 'Producer User';
      }
      
      // Store in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', name);
      
      return { success: true };
    }
    return { success: false, error: 'Please enter email and password' };
  },
  
  signUp: async (email: string, password: string, name: string, role: string) => {
    // Demo signup - just store in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
    return { success: true };
  },
  
  signOut: () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
  }
};
