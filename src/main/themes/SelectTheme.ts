export const customStyles = {
    menuPortal: (provided: any) => ({ ...provided, zIndex: 9999 }),
    menu: (provided: any) => ({ ...provided, zIndex: 9999, overflowY: 'auto' }),
    control: (provided: any) => ({
        ...provided,
        position: 'relative',
        zIndex: 1000
    }),
    menuList: (provided: any) => ({
        ...provided,
        maxHeight: '200px',
        overflowY: 'auto'
    })
};