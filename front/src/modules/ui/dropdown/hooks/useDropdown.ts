import { usePreviousHotkeyScope } from '@/ui/utilities/hotkey/hooks/usePreviousHotkeyScope';
import { useRecoilScopedFamilyState } from '@/ui/utilities/recoil-scope/hooks/useRecoilScopedFamilyState';

import { dropdownButtonHotkeyScopeScopedFamilyState } from '../states/dropdownButtonHotkeyScopeScopedFamilyState';
import { isDropdownButtonOpenScopedFamilyState } from '../states/isDropdownButtonOpenScopedFamilyState';
import { DropdownRecoilScopeContext } from '../states/recoil-scope-contexts/DropdownRecoilScopeContext';

export const useDropdown = ({ dropdownId }: { dropdownId: string }) => {
  const {
    setHotkeyScopeAndMemorizePreviousScope,
    goBackToPreviousHotkeyScope,
  } = usePreviousHotkeyScope();

  const [isDropdownButtonOpen, setIsDropdownButtonOpen] =
    useRecoilScopedFamilyState(
      isDropdownButtonOpenScopedFamilyState,
      dropdownId,
      DropdownRecoilScopeContext,
    );

  const [dropdownButtonHotkeyScope] = useRecoilScopedFamilyState(
    dropdownButtonHotkeyScopeScopedFamilyState,
    dropdownId,
    DropdownRecoilScopeContext,
  );

  const closeDropdownButton = () => {
    goBackToPreviousHotkeyScope();
    setIsDropdownButtonOpen(false);
  };

  const openDropdownButton = () => {
    setIsDropdownButtonOpen(true);

    if (dropdownButtonHotkeyScope) {
      setHotkeyScopeAndMemorizePreviousScope(
        dropdownButtonHotkeyScope.scope,
        dropdownButtonHotkeyScope.customScopes,
      );
    }
  };

  const toggleDropdownButton = () => {
    if (isDropdownButtonOpen) {
      closeDropdownButton();
    } else {
      openDropdownButton();
    }
  };

  return {
    isDropdownOpen: isDropdownButtonOpen,
    closeDropdown: closeDropdownButton,
    toggleDropdown: toggleDropdownButton,
    openDropdown: openDropdownButton,
  };
};
