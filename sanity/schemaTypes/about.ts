export default {
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string'
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text'
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'category',
            title: 'Category',
            type: 'string'
          },
          {
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [{ type: 'string' }]
          }
        ]
      }]
    },
    {
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'school', title: 'School', type: 'string' },
          { name: 'degree', title: 'Degree', type: 'string' },
          { name: 'period', title: 'Period', type: 'string' },
          { name: 'desc', title: 'Description', type: 'text' }
        ]
      }]
    },
    {
      name: 'experience',
      title: 'Experience',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'company', title: 'Company', type: 'string' },
          { name: 'role', title: 'Role', type: 'string' },
          { name: 'period', title: 'Period', type: 'string' },
          { name: 'desc', title: 'Description', type: 'text' }
        ]
      }]
    }
  ]
} 