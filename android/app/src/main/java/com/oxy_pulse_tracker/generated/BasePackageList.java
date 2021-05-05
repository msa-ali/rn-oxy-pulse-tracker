package com.oxy_pulse_tracker.generated;

import java.util.Arrays;
import java.util.List;
import org.unimodules.core.interfaces.Package;

public class BasePackageList {
  public List<Package> getPackageList() {
    return Arrays.<Package>asList(
        new expo.modules.print.PrintPackage(),
        new expo.modules.sharing.SharingPackage()
    );
  }
}
