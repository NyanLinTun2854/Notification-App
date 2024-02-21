#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import "RNFBMessagingModule.h"

@interface AppDelegate : RCTAppDelegate
self.initialProps = [RNFBMessagingModule addCustomPropsToUserProps:nil withLaunchOptions:launchOptions];

@end
